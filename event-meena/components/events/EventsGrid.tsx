"use client";

import { Event } from "@/types/event";
import EventCard from "./EventCard";

interface EventsGridProps {
  events: Event[];
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onArchive?: (id: string) => void;
}

export default function EventsGrid({
  events,
  onDelete,
  onDuplicate,
  onArchive,
}: EventsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}

