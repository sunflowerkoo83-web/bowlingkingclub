import Card from "@/components/ui/Card";
import { BOWLING_CENTER } from "@/lib/constants";

export default function LocationCard() {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-navy-600">활동 장소</h2>
      <p className="mt-4 text-lg font-semibold text-ember-600">
        {BOWLING_CENTER.name}
      </p>
      <p className="mt-1 text-navy-600/90">{BOWLING_CENTER.address}</p>
      <p className="mt-1 text-navy-600/90">{BOWLING_CENTER.phone}</p>
    </Card>
  );
}
