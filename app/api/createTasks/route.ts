import { dbConnect } from '@/dbConfig/dbConfig';
import Task from '@/models/task.models';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { person, title, description, dueDate } = reqBody;

        const newTask = new Task({
            person,
            title,
            description: description ? description : '',
            dueDate,
            completed: false,
        });

        const savedTask = await newTask.save();

        return NextResponse.json({
            status: 200,
            body: {
                success: true,
                message: 'Task created successfully',
                data: savedTask,
            },
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                success: false,
                message: 'Internal Server Error',
                error: error,
            },
        });
    }
}
