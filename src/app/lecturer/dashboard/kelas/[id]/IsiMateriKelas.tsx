import { ListKelas } from "@/src/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

interface IsiMateriKelasProps {
  isikelas: ListKelas;
}

const IsiMateriKelas = ({ isikelas }: IsiMateriKelasProps) => {
  return (
    <>
      <div>
        {isikelas?.sections?.map((bab: any) => (
          <Accordion
            type="single"
            collapsible={true}
            className="w-full"
            key={bab.id}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>{bab.section_title}</AccordionTrigger>
              <AccordionContent>
                {bab.modules.map((mod: any) => (
                  <p
                    key={mod.id}
                    className="mb-2 cursor-pointer hover:underline"
                  >
                    {mod.module_title}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default IsiMateriKelas;
