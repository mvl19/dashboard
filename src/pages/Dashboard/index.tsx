import { useState } from "react";
import { Flex } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function Dashboard() {

    return (
        <div className="flex justify-center">
            <div className="w-[100%] h-screen max-h-[100%] flex flex-col items-center bg-darkbg p-[24px]">
                <div className="border border-darkgrey border-1 p-[10px] gap-2 w-[98%] min-w-[320px] flex flex-wrap flex-row sm:justify-center md:justify-between items-center">
                    <div className="bg-darkitem h-[90px] lg:basis-[32%] md:basis-auto min-w-[300px] flex justify-center items-center">
                        Card #1
                    </div>
                    <div className="bg-darkitem h-[90px] lg:basis-[32%] md:basis-auto min-w-[300px] flex justify-center items-center">
                        Card #2
                    </div>
                    <div className="bg-darkitem h-[90px] lg:basis-[32%] md:basis-auto min-w-[300px] flex justify-center items-center">
                        Card #3
                    </div>
                </div>
                <Flex wrap="wrap" gap='small' justify="space-between" className="border border-darkgrey border-1 p-[10px] w-[98%] min-w-[320px]">
                    <div className="bg-darkitem h-[90px] lg:basis-[32%] md:basis-auto min-w-[300px] flex justify-center items-center">
                        Card #1
                    </div>
                    <div className="bg-darkitem h-[90px] lg:basis-[32%] md:basis-auto min-w-[300px] flex justify-center items-center">
                        Card #2
                    </div>
                    <div className="bg-darkitem h-[90px] lg:basis-[32%] md:basis-auto min-w-[300px] flex justify-center items-center">
                        Card #3
                    </div>
                </Flex>
            </div>
        </div>
    )
}