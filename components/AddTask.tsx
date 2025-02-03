'use client';

import React from 'react';
import { Button } from './ui/button';
import { CiSquarePlus } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

function AddTask() {
    return (
        <div>
            <Button variant="secondary" className="w-full">
                <div className="flex justify-between w-full">
                    <span className="text-xl font-bold">New Task </span>
                    <FaPlus size={20} className="pt-1" />
                </div>
            </Button>
        </div>
    );
}

export default AddTask;
