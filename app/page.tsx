import AddTask from '@/components/AddTask';
import TaskList from '@/components/TaskList';
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

export default function Home() {
    return (
        <main className="max-w-4xl flex w-auto mx-auto flex-col items-center justify-center mt-10">
            <div className="flex flex-col text-center gap-8 mt-10">
                <h1 className="text-2xl font-bold">
                    Welcome to Task Management Application
                </h1>
                <div>
                    <Button variant="secondary" className="w-full">
                        <div className="flex justify-between w-full">
                            <span className="text-xl font-bold">New Task </span>
                            <FaPlus size={20} className="pt-1" />
                        </div>
                    </Button>
                </div>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Invoice</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </main>
    );
}
