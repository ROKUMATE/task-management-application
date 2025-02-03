'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axios from 'axios';

interface Task {
    _id: string;
    person: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({
        _id: '',
        person: '',
        title: '',
        description: '',
        dueDate: '',
        completed: false,
    });

    useEffect(() => {
        getAllTasks();
    }, []);

    const getAllTasks = async () => {
        try {
            const response = await axios.get(`/api/getTasks`);
            console.log(response);
            setTasks(response.data.body.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddTask = async () => {
        if (
            newTask.person === '' ||
            newTask.title === '' ||
            newTask.dueDate === ''
        ) {
            return (
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Some Fields Empty!</AlertTitle>
                    <AlertDescription>
                        All Fields are necessary to fill up!
                    </AlertDescription>
                </Alert>
            );
        }

        try {
            const response = await axios.post(
                '/api/createTasks',
                {
                    person: newTask.person,
                    title: newTask.title,
                    description: newTask.description,
                    dueDate: newTask.dueDate,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        getAllTasks();
        setNewTask({
            _id: '',
            person: '',
            title: '',
            description: '',
            dueDate: '',
            completed: false,
        });
    };

    const handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleToggleComplete = async (id: string, completed: boolean) => {
        try {
            await axios.put(
                '/api/updateTasks',
                {
                    id,
                    completed: !completed,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            getAllTasks();
        } catch (error) {
            console.error('Error updating completion status:', error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            const response = await axios.delete('/api/deleteTasks', {
                data: { id },
            });
            console.log('Deleted response:', response.data);
            getAllTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEditTask = async (id: string, updates: Partial<Task>) => {
        try {
            await axios.put(
                '/api/updateTasks',
                { id, ...updates },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            getAllTasks();
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    return (
        <main className="max-w-4xl flex w-auto mx-auto flex-col items-center justify-center mt-10">
            <div className="flex flex-col text-center gap-8 mt-10">
                <h1 className="text-2xl font-bold">
                    Welcome to Task Management Application
                </h1>
                <div>
                    <Input
                        type="text"
                        name="person"
                        placeholder="Person Name"
                        value={newTask.person}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border"
                    />
                    <Input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border"
                    />
                    <Input
                        type="text"
                        name="description"
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border"
                    />
                    <Input
                        type="date"
                        name="dueDate"
                        value={newTask.dueDate}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border"
                    />
                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={handleAddTask}>
                        <div className="flex justify-between w-full">
                            <span className="text-xl font-bold">New Task </span>
                            <FaPlus size={20} className="pt-1" />
                        </div>
                    </Button>
                </div>
            </div>
            <Table>
                <TableCaption>A list of your tasks.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Person</TableHead>
                        <TableHead className="text-left">Title</TableHead>
                        <TableHead className="text-left">Description</TableHead>
                        <TableHead className="text-left">Due Date</TableHead>
                        <TableHead className="text-left">Completed</TableHead>
                        <TableHead className="text-left">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task._id}>
                            <TableCell className="font-medium">
                                {task.person}
                            </TableCell>
                            <TableCell className="font-medium">
                                {task.title}
                            </TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() =>
                                        handleToggleComplete(
                                            task._id,
                                            task.completed
                                        )
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="secondary"
                                    className="mr-2"
                                    onClick={() =>
                                        handleEditTask(task._id, {
                                            title:
                                                prompt(
                                                    'Enter new title',
                                                    task.title
                                                ) || task.title,
                                        })
                                    }>
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteTask(task._id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
}
