import { dbConnect } from '@/dbConfig/dbConfig';
import Task from '@/models/task.models';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function GET(request: NextRequest) {
    try {
        // get all tasks
        const tasks = await Task.find();
        return NextResponse.json({
            status: 200,
            body: {
                success: true,
                message: 'Tasks retrieved successfully',
                data: tasks,
            },
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                success: false,
                message: 'Internal Server Error',
            },
        });
    }
}
