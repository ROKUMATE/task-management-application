import { dbConnect } from '@/dbConfig/dbConfig';
import Task from '@/models/task.models';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function PUT(request: NextRequest) {
    try {
        // update given task id
        const reqBody = await request.json();
        const { id, title, description, dueDate, completed } = reqBody;
        const updateData: any = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
        if (completed !== undefined) updateData.completed = completed;

        const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedTask) {
            return NextResponse.json({
                status: 404,
                body: {
                    success: false,
                    message: 'Task not found',
                },
            });
        } else {
            return NextResponse.json({
                status: 200,
                body: {
                    success: true,
                    message: 'Task updated successfully',
                    data: updatedTask,
                },
            });
        }
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
