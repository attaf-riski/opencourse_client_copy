import { Avatar, AvatarFallback } from "@/../../src/components/ui/avatar";
import { SiswaUAS } from "@/../../src/types";

interface NamaSiswaUASProps {
  siswa: SiswaUAS[];
}

const NamaSiswaUAS = ({ siswa }: NamaSiswaUASProps) => {
  return (
    <>
      {siswa.map((sis) => (
        <div className="flex gap-2" key={sis.id}>
          <Avatar>
            <AvatarFallback>??</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg">{sis.nama}</p>
            <p>{sis.date}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default NamaSiswaUAS;
