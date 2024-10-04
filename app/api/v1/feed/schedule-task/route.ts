import { startSchedule, stopSchedule } from './cron';
import { NextRequest } from 'next/server';
import { responseHandler } from '@/utils/response-handler';

// Start the task with a given cron schedule
export async function POST(req: NextRequest) {
    try {
        const { schedule } = await req.json();

        // Validate if the schedule is provided
        if (!schedule) {
            return responseHandler({
                status: 400,
                message: "Please provide a valid cron schedule.",
            });
        }

        // Start the schedule if valid
        startSchedule(schedule);
        return responseHandler({
            status: 200,
            message: "Scheduled task set up successfully.",
        });

    } catch (error) {
        return responseHandler({
            status: 500,
            message: "An error occurred while setting the schedule.",
        });
    }
}

// Stop the task
export async function DELETE() {
    try {
        stopSchedule();
        return responseHandler({
            status: 200,
            message: "Scheduled task stopped successfully.",
        });
    } catch (error) {
        return responseHandler({
            status: 500,
            message: "An error occurred while stopping the schedule.",
        });
    }
}
