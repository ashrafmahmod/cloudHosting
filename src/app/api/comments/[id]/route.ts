import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/lib.prisma";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from "@/utils/dtos";
import { updateCommentSchema } from "@/utils/validationSchemas";



interface Props {
  // In Next.js 15, params is a Promise
  params: Promise<{ id: string }>;
}


export async function PUT (request:NextRequest , {params} :Props) {
    try {
        const {id} = await params
        const comment = await prisma.comment.findUnique({where:{id:parseInt(id)}})
        if(!comment) return NextResponse.json({message:"commet not found"} , {status:404})
            const user = verifyToken(request)
        if(!user || user.id !== comment.userId) return NextResponse.json({message:"you are not allowed"},{status:403})
            const body = await request.json() as UpdateCommentDto
        const validation = updateCommentSchema.safeParse(body);
            if (!validation.success)
              return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 },
              );
              const updatedComment = await prisma.comment.update({where:{id:parseInt(id)} , data:{text:body.text}})
              return NextResponse.json(updatedComment , {status:200})
    } catch (error) {
        console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      },
    );
    }
}
export async function DELETE (request:NextRequest , {params} :Props) {
    try {
        const {id} = await params
        const comment = await prisma.comment.findUnique({where:{id:parseInt(id)}})
        if(!comment) return NextResponse.json({message:"commet not found"} , {status:404})
            const user = verifyToken(request)
        if(user === null) return NextResponse.json({message:"no token provided"},{status:401})
        if(user.isAdmin || user.id === comment.userId ) {
            await prisma.comment.delete({where:{id:parseInt(id)}})
            return NextResponse.json({message:'comment deleted'} , {status:200})
        }
            return NextResponse.json({message:"you are not allowed"} , {status:403})
      
              
    } catch (error) {
        console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      },
    );
    }
}