"use client"

import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { cn } from "@aetherstack/utils"

export interface SortableListItem {
  id: string
  [key: string]: unknown
}

export interface SortableItemProps {
  item: SortableListItem
  renderItem: (item: SortableListItem, isDragging: boolean) => React.ReactNode
}

export function SortableItem({ item, renderItem }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex items-center gap-2", isDragging && "z-50 opacity-75")}
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="min-w-0 flex-1">{renderItem(item, isDragging)}</div>
    </div>
  )
}

export interface SortableListProps {
  items: SortableListItem[]
  onReorder: (items: SortableListItem[]) => void
  renderItem: (item: SortableListItem, isDragging: boolean) => React.ReactNode
  className?: string
}

export function SortableList({ items, onReorder, renderItem, className }: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id)
      const newIndex = items.findIndex((i) => i.id === over.id)
      onReorder(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div
          role="list"
          aria-label="Sortable list"
          className={cn("flex flex-col gap-2", className)}
        >
          {items.map((item) => (
            <div key={item.id} role="listitem">
              <SortableItem item={item} renderItem={renderItem} />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
