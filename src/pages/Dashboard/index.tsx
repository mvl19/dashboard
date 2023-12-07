import { useState, useEffect } from "react";
import { Flex } from 'antd'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from "./helper/StrictModeDnd";
import AreaChart from "../../components/Area";
import PieChart from "../../components/Pie"
import HorizontalBar from "../../components/Bar"
import { bar, salaryData, spendingData } from "../../data"
import { ParentSize } from "@visx/responsive"
import { letterFrequency } from "../../data"

const firstRow = [
    {
        id: '1',
        name: 'Score Card'
    },
    {
        id: '2',
        name: 'Score Card'
    },
    {
        id: '3',
        name: 'Score Card'
    }
]

export default function Dashboard() {
    const [rowOneItems, setRowOneItems] = useState(firstRow)

    const handleDragDrop = (res: any) => {
        const {source, destination, type} = res
        
        if(!destination) return;
        if(source.index === destination.index && source.droppableId === destination.droppableId) return;

        if(type === 'group') {
            const newRowOneItems = [...rowOneItems]

            const sourceIdx = source.index
            const destinationIdx = destination.index
            
            const [draggedItem] = newRowOneItems.splice(sourceIdx, 1)
            newRowOneItems.splice(destinationIdx, 0, draggedItem)

            return setRowOneItems(newRowOneItems)
        }

    }

    return (
        <div className="flex justify-center">
            <div className="w-[100%] h-screen max-h-[100%] flex flex-col items-center bg-darkbg p-[24px]">
                <DragDropContext onDragEnd={handleDragDrop}>
                    <Droppable droppableId='rowOne' type='group' direction="horizontal">
                        {(provided: any) => (
                            <Flex wrap="wrap" gap='small' justify="space-between" className="p-[10px] w-[98%] min-w-[320px]" {...provided.droppableProps} ref={provided.innerRef}>            
                                {
                                    rowOneItems.map((item, idx) => (
                                        <Draggable draggableId={item.id} key={item.id} index={idx}>
                                            {(provided: any) => (
                                                <div className="bg-darkitem h-[90px] lg:basis-[32%] md:basis-auto min-w-[300px] flex justify-center items-center" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                    Card #{item.id} - {item.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </Flex>
                        )}
                    </Droppable>
                </DragDropContext>
                <ParentSize>
                    {({ width, height }) =><AreaChart width={width} height={height} />}
                </ParentSize>
                <ParentSize>
                    {({ width, height }) =><HorizontalBar width={width} height={height} data={bar.slice(0,8)}/>}
                </ParentSize>
                <ParentSize>
                    {({ width, height }) =><PieChart width={width} height={height} dataset={letterFrequency} accessor="frequency" labels="letter" />}
                </ParentSize>
                
            </div>
        </div>
    )
}