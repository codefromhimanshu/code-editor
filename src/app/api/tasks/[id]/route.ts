// export const dynamic = 'force-dynamic' // defaults to force-static

import { type NextRequest } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import {User, Task} from '../../../../models';


export async function GET(request: Request) {
  
    try {
      const tasks = await Task.findOne({where:{id:id }});
      return Response.json(tasks);
    } catch (error) {
      console.log(error)
      return Response.json({ message: 'Internal Server Error' }, {
        status: 500,
      });
    }

}

export async function PUT(request: NextRequest) {

  try {
    const session = await getServerSession( authOptions)
    const { title, description, status, id } = await request.json();
    const user = await User.findOne({where:{email: session.user.email}});
    const task = await Task.update({ title, description, status, assigneeId: user.id }, {where:{assigneeId: user.id, id:id }});
    return Response.json(task, {
      status: 201,
    });
  } catch (error) {
    console.log(error)
    return Response.json({ message: 'Internal Server Error' }, {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest,  { params }: { params: { id: string } }) {

  try {
    const session = await getServerSession( authOptions)

    const user = await User.findOne({where:{email: session.user.email}});
    const task = await Task.destroy({where:{assigneeId: user.id, id:params.id }});
    return Response.json(task, {
      status: 201,
    });
  } catch (error) {
    console.log(error)
    return Response.json({ message: 'Internal Server Error' }, {
      status: 500,
    });
  }
}
