
import React, { useEffect, useState } from 'react';

import { redirect } from 'next/navigation'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"

import TaskPage from '../../components/TaskPage';
import SignOut from '../../components/Logout';


const TasksPage = async (params) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  
  return (
      <div className="min-h-screen bg-gray-100 ">
        <div className="bg-white px-4 py-5 shadow-md">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-xl font-bold">Task Manager</h1>
            <SignOut />
          </div>
        </div>
        <div className="max-w-6xl mx-auto p-4">
          <TaskPage/>
        </div>
      </div>
  );
};



export default TasksPage;
