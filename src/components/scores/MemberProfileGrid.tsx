import MemberProfileCard from "@/components/scores/MemberProfileCard";
import type { Member } from "@/lib/types";

export default function MemberProfileGrid({ members }: { members: Member[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {members.map((member) => (
        <MemberProfileCard key={member.id} member={member} />
      ))}
    </div>
  );
}
