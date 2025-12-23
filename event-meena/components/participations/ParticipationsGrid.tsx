"use client";

import { ParticipatedEvent } from "@/types/participation";
import ParticipationCard from "./ParticipationCard";

interface ParticipationsGridProps {
  participations: ParticipatedEvent[];
  onViewDetails: (responseId: string) => void;
}

export default function ParticipationsGrid({
  participations,
  onViewDetails,
}: ParticipationsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {participations.map((participation) => (
        <ParticipationCard
          key={participation.responseId}
          participation={participation}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

