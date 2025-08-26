import {headers as getHeaders} from "next/headers"
import { baseProcedure,createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";
import { stripe } from "@/lib/stripe";
import { generateTenantURL } from "@/lib/utils";
import { Tenant } from "@/payload-types";

export const authRouter=createTRPCRouter({
    session:baseProcedure.query(async({ctx})=>{
        const headers=await getHeaders();
        const session=await ctx.db.auth({headers});

        return session;
    }),
    getSessionRedirect: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();
        const session = await ctx.db.auth({ headers });

        // Default fallback URL
        let redirectUrl = process.env.NEXT_PUBLIC_APP_URL || '/';

        if (session.user) {
            try {
                // Get user's tenant information
                const userWithTenants = await ctx.db.findByID({
                    collection: 'users',
                    id: session.user.id,
                    depth: 2, // To populate tenant relationship
                });

                // If user has a tenant, redirect to their tenant homepage
                if (userWithTenants.tenants && userWithTenants.tenants.length > 0) {
                    const firstTenant = userWithTenants.tenants[0];
                    if (firstTenant && typeof firstTenant.tenant === 'object' && firstTenant.tenant) {
                        const tenant = firstTenant.tenant as Tenant;
                        redirectUrl = generateTenantURL(tenant.slug);
                    }
                }
            } catch (error) {
                console.error('Error getting user tenant info:', error);
                // Continue with default redirect URL
            }
        }

        return {
            redirectUrl,
            isAuthenticated: !!session.user,
            user: session.user ? {
                id: session.user.id,
                email: session.user.email,
                username: session.user.username
            } : null
        };
    }),
    
    register:baseProcedure
    .input(
        registerSchema
    )
    .mutation(async({input,ctx})=>{
        const existingData=await ctx.db.find({
            collection:"users",
            limit:1,
            where:{
                username:{
                    equals:input.username,
                },
            },
        })

        const existingUser=existingData.docs[0];
        if(existingUser){
            throw new TRPCError({
                code:"BAD_REQUEST",
                message:"Username already taken"
            })
        }

        const account=await stripe.accounts.create({})

        if(!account){
            throw new TRPCError({
                code:"BAD_REQUEST",
                message:"Failed to create Stripe account"
            })
        }

        const tenant=await ctx.db.create({
            collection:"tenants",
            data:{
                name:input.username,
                slug:input.username,
                stripeAccountId:account.id
            }
        })

        await ctx.db.create({
            collection:"users",
            data:{
                email:input.email,
                username:input.username,
                password:input.password,
                tenants:[
                    {
                    tenant:tenant.id,
                    },
                ],
            }
        });
        const data=await ctx.db.login({
            collection:"users",
            data:{
                email:input.email,
                password:input.password,
            }
        }) 
        if(!data.token){
            throw new TRPCError({
                code:"UNAUTHORIZED",
                message:"Failed to Login",
            })
        }
        await generateAuthCookie({
            prefix:ctx.db.config.cookiePrefix,
            value:data.token,
        })

    }),
    login:baseProcedure
    .input(loginSchema)
    .mutation(async({input,ctx})=>{
        const data=await ctx.db.login({
            collection:"users",
            data:{
                email:input.email,
                password:input.password,
            }
        }) 
        if(!data.token){
            throw new TRPCError({
                code:"UNAUTHORIZED",
                message:"Failed to Login",
            })
        }
        await generateAuthCookie({
            prefix:ctx.db.config.cookiePrefix,
            value:data.token,
        })

        return data;
    }),
})