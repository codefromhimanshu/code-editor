// export const dynamic = 'force-dynamic' // defaults to force-static
import { type NextRequest } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import {User, Task} from '../../../models';
const { Op } = require("sequelize");

export async function GET(request: Request) {
  
    try {
      const session = await getServerSession( authOptions)
      const user = await User.findOne({where:{email: session.user.email}});
      let tasks = [];
      if (user && user.role === 'admin') {
         tasks = await Task.findAll();
      } else {
         tasks = await Task.findAll({where:{ assigneeId: user.id}});
      }
      return Response.json(tasks);
    } catch (error) {
      console.log(error)
      return Response.json({ message: 'Internal Server Error' }, {
        status: 500,
      });
    }

}

export async function POST(request: NextRequest) {

    try {
      const session = await getServerSession( authOptions)
      const { title, description, status } = await request.json();
      const user = await User.findOne({where:{email: session.user.email}});
      const task = await Task.create({ title, description, status, assigneeId: user.id });
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

