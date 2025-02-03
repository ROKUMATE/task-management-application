import { dbConnect } from '@/dbConfig/dbConfig';
import Task from '@/models/task.models';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const { person, title, description, dueDate } = reqBody;

        console.log(dueDate);

        const newTask = new Task({
            person,
            title,
            description: description ? description : '',
            dueDate,
            completed: false,
        });

        const savedTask = await newTask.save();
        console.log(savedTask);

        return NextResponse.json({
            status: 200,
            body: {
                success: true,
                message: 'Task created successfully',
                data: savedTask,
            },
        });
    } catch (error) {
        console.log(error);
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
