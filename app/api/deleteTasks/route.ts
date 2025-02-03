import { dbConnect } from '@/dbConfig/dbConfig';
import Task from '@/models/task.models';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function DELETE(request: NextRequest) {
    try {
        // delete given task id
        const reqBody = await request.json();
        const { id } = reqBody;
        console.log('id ', id);
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
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
                    message: 'Task deleted successfully',
                },
            });
        }
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
