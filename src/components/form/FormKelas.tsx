"use client"

import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { DataInstrukturKelas  } from "@/src/constants/example";
import { DipelajariKLS, InstrukturKLS, KategoriKLS, ListKelas, TagKLS } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import TambahBab from "./TambahBab";
import { Button } from "@/src/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import {APISemuaKategori} from "@/src/service/ApiKategori";
import {APISemuaLecturer} from "@/src/service/ApiLecturer";


const formSchema = z.object({
  name: z.string().min(5, {message: "Isi Dulu Nama Kelas, Mininal 5 huruf"}),
  description: z.string(),
  duration: z.coerce.number(),
  effort_taken: z.coerce.number(),
  price: z.coerce.number(),
  language: z.string(),
  transkrip_video: z.string(),
});


type FormKelasProps = {
  typeBtn :  string;
  AllValue? : (data: z.infer<typeof formSchema>) => void;
  oldData? : ListKelas;
  respon?: (data: any) => void;
  dataBab?: any;
  addForm?: (data: any) => void;
}


const FormKelas = ({typeBtn, AllValue, oldData, respon, dataBab, addForm} : FormKelasProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { control } = form
  const valueForm = useWatch({control})
  // data pada valueForm langsung di lempar di page.tsx saat pengisian data 

  const [categories, setCategories] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    if (respon) {
      respon(valueForm);
    }
    const fetchCategories = async () => {
      try {
        const response = await APISemuaKategori(); // Call the APISemuaKategori function
        if (response.error) {
          console.error('Error fetching categories:', response.message);
          // Handle error here (e.g., display an error message)
          return;
        }
        const fetchedCategories = response.data; // Assuming "data" contains the category objects
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error here (e.g., display an error message)
      }
    };

    const fetchLecturers = async () => {
      try {
        const response = await APISemuaLecturer(); // Call the APISemuaKategori function
        if (response.error) {
          console.error('Error fetching lecturer:', response.message);
          // Handle error here (e.g., display an error message)
          return;
        }
        const fetchedLecturer = response.data; // Assuming "data" contains the category objects
        setLecturers(fetchedLecturer);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
        // Handle error here (e.g., display an error message)
      }
    };

    fetchCategories();
    fetchLecturers();
    console.log(lecturers);
  }, [valueForm, respon]);


  // * ------- sisi kanan -------------
  const [pelajari, setPelajari] = useState<DipelajariKLS[]>([])
  const [inputPelajari, setInputPelajari] = useState("")
  const [editPelajariId, setEditPelajariId] = useState(null)

  const ButtonPelajari = (event: any) => {
    event.preventDefault()

    if (editPelajariId !== null) {
      setPelajari((prevPelajari) =>
        prevPelajari.map((item) =>
          item.id === editPelajariId ? {...item, pelajari: inputPelajari} : item
        )
      );
      setEditPelajariId(null)
      setInputPelajari(" ")
      const editedPelajari = pelajari.find(item => item.id === editPelajariId);
      toast.warning(`${editedPelajari?.pelajari} sudah diedit`);

    } else {
      const newPelajari: DipelajariKLS = {
        id: pelajari.length + 1,
        pelajari: inputPelajari,
      };
  
      setPelajari((prevPelajari) => [...prevPelajari, newPelajari]);
      setInputPelajari(" ")
      toast.success(`${newPelajari.pelajari} ditambahkan`)
    }
  };

  const hapusPelajari = (hapus: any) => {
    const sisaPelajari = pelajari.filter((tag: any) => tag.id !== hapus.id);
    setPelajari(sisaPelajari);
    toast.error(`${hapus?.pelajari} dihapus`)
  };

  const editPelajari = (event: any, edit: any) => {
    event.preventDefault();
    setEditPelajariId(edit.id)
    setInputPelajari(edit.pelajari)
  }


  const [cariInstruktur, setCariInstruktur] = useState("")
  const [pilihanInstruktur, setPilihanInstruktur] = useState<InstrukturKLS[]>([])

  useEffect(() => {
    const hasilCariInstruktur = lecturers.filter((item) =>
      item.full_name.toLowerCase().includes(cariInstruktur.toLowerCase())
    );

    setPilihanInstruktur(hasilCariInstruktur)
    setCariInstruktur("");
  }, [cariInstruktur])

  const [instruktur, setInstruktur] = useState<number[]>([])
  const tambahInstruktur = (event: any, id: number) => {
    event.preventDefault()
    
    const insSudahAda = instruktur.includes(id)

    if(!insSudahAda) {
      setInstruktur([...instruktur, id]);
      setPilihanInstruktur(sisaPilihanInstruktur => sisaPilihanInstruktur.filter(ins => ins.id !== id));
    }

    const yangDitambah = lecturers.find(item => item.id === id);
    toast.success(`instruktur ${yangDitambah?.full_name} ditambahkan`)
  }

  const hapusInstruktur = (event:any, hapus: any) => {
    event.preventDefault()
    const idHapus = parseInt(hapus.id, 10); // Ubah id menjadi integer
    const sisaInstruktur = instruktur.filter((tag: any) => tag !== idHapus);  
    
    setInstruktur(sisaInstruktur);

    // Memeriksa apakah instruktur yang dihapus sudah ada di dalam pilihanInstruktur sebelum menambahkannya kembali
    const instrukturYangDihapus = lecturers.find(ins => ins.id === idHapus);
    if (instrukturYangDihapus && !pilihanInstruktur.some(ins => ins.id === idHapus)) {
      setPilihanInstruktur([...pilihanInstruktur, instrukturYangDihapus]);
    }

    const yangDihapus = lecturers.find(item => item.id === hapus.id);
    toast.success(`instruktur ${yangDihapus?.full_name} dihapus`)
  }

  const instrukturSaya = lecturers.filter(ins => instruktur.includes(ins.id))

  

    // * ------- sisi kiri -------------
    const [cariKategori, setCariKategori] = useState("");
    const [hasilCariKategori, setHasilCariKategori] = useState<KategoriKLS[]>([]);

    // DataKategoriKelas diganti data dari db

    useEffect(() => {
      const hasilPencarian = categories.filter((item) =>
        item.category_name.toLowerCase().includes(cariKategori.toLowerCase())
      );
  
      setHasilCariKategori(hasilPencarian);
    }, [cariKategori]);

  return (
    <>
      <div>
        <Form {...form}>
          <form
            className="grid grid-cols-4 justify-between gap-10"
            id={ typeBtn === "drafted" ? "drafted" : typeBtn === "published" ? "published" : "hapus" }
          >
            {/* // ! --- sisi kanan ----  */}
            <div className="col-span-3 flex flex-col gap-4">


              {/* field name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nama Kelas" {...field} defaultValue={oldData ? oldData.name : "" || ""}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* field description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tulis Tentang Kelas Ini"
                        {...field}
                        className="h-48"
                        defaultValue={oldData ? oldData.about : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* area yang dipelajari */}
              <div className="w-full">
                <h3 className="mt-10 font-extrabold mb-5">Apa yang Dipelajari</h3>

                {pelajari.length > 0 ? (
                  pelajari.map((pel) => ( 
                    <div className="flex gap-2 items-start w-3/4 space-y-2 hover:border-b">
                      <p className="mt-2">◾</p>
                      <p className="flex-1">{pel.pelajari}</p>
                      <div className="flex gap-2 ml-10">
                        <button 
                          onClick={() => hapusPelajari(pel)}
                          className="border p-1 rounded-sm hover:bg-red-100"
                        ><Trash className="w-3 h-3 opacity-50  group-hover:opacity-80"/>
                        </button>
                        <button 
                          onClick={(e) => editPelajari(e, pel)}
                          className="border p-1 rounded-sm hover:bg-purple-100"
                        ><Edit className="w-3 h-3 opacity-50  group-hover:opacity-80"/>
                        </button>
                      </div>
                    </div>     
                  ))) : (
                  <p className="italic text-sm opacity-50">Belum ada item yang dipelajari.</p>
                  )
                }
                <Input 
                  className="mt-5"
                  placeholder="Menjadi Insan manusia yang berakhlak mulia" 
                  onChange={(e) => setInputPelajari(e.target.value)}
                  value={inputPelajari}
                />
                <Button 
                  variant="secondary" 
                  onClick={ButtonPelajari}
                  className="w-full mt-4"
                >{editPelajariId !== null ? "Edit" : "+ Tambahkan"}
                </Button>
              </div>


              {/* area tambah instruktur */}
              <div className="w-full">
                <h3 className="font-extrabold mt-10">Anggota Instruktur/Dosen Pengajar</h3>
                <Input
                  className="mt-3"
                  placeholder="Cari Instruktur"
                  onChange={(e) => setCariInstruktur(e.target.value)}
                />

                <div className="h-40 overflow-y-scroll mt-2">
                  {pilihanInstruktur.length > 0 ? (
                    pilihanInstruktur.map((ins) => (
                      <div className="flex justify-between border-2 rounded-md p-4 mb-4" key={ins.id}>
                        <p>{ins.full_name}</p>
                        <button 
                          className="underline text-blue-400" 
                          onClick={(event)=>tambahInstruktur(event, ins?.id)}
                        >Tambahkan</button>
                      </div>
                    ))
                  ) : (
                    <p className="italic text-sm opacity-50 mt-10">Instruktur yang dicari tidak ada.</p>
                  )}
                </div>


                <div className="flex flex-col gap-4 mb-10 mt-4">
                  {instrukturSaya.length > 0 ? (
                    instrukturSaya.map((ins) => (
                      <div className="flex gap-4 items-center hover:bg-slate-50 rounded-lg px-1" key={ins.id}>
                        <div className="h-16 w-16 rounded-full bg-gray-300"></div>
                        <div className="flex-1">
                          <p className="font-extrabold">{ins.full_name}</p>
                          <p>{ins.jabatan ? ins.jabatan : "-"}</p>
                        </div>
                        <button 
                          className="border p-1 rounded-sm hover:bg-red-100"
                          onClick={() => hapusInstruktur(event ,ins)}
                        ><Trash className="w-3 h-3 opacity-50  group-hover:opacity-80"/>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="italic text-sm opacity-50 mt-10">Belum ada Instruktur yang dipilih.</p>
                  )}
                </div> 
              </div>
                

              
              {/* area tambah kelas */}
              <TambahBab dataBab={(e: any) => dataBab(e)} sections={oldData?.sections} course_id={oldData?.id} isAddForm={addForm}/>

            </div>

            {/* // ! --- sisi kiri ----  */}
            <div className="border">
              <h1 className="text-center text-md font-bold py-3 bg-gray-400">
                Informasi kelas
              </h1>

              {/* field lama_kelas */}
              <div>
                <div className="bg-gray-300">
                  <h2 className="py-2 pl-2 ">Durasi Kelas</h2>
                </div>

                <div className="p-2">
                  <FormField
                      control={form.control}
                      name="duration"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>Lama Kelas</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="8 minggu" {...field}
                                     defaultValue={oldData ? oldData.duration : 0}/>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
                </div>

                <div className="p-2">
                  <FormField
                      control={form.control}
                      name="effort_taken"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>Upaya</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="2-4 minggu" {...field}
                                     defaultValue={oldData ? oldData.effort_taken : 0}/>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
                </div>
              </div>


              {/* field Harga */}
              <div>
                <div className="bg-gray-300">
                  <h2 className="py-2 pl-2 ">Harga Kelas</h2>
                </div>

                <div className="p-2">
                  <FormField
                      control={form.control}
                      name="price"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>Harga</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="200.000" {...field}
                                     defaultValue={oldData ? oldData.price : 0}/>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
                </div>
              </div>


              {/* field bahasa kelas */}
              <div>
                <div className="bg-gray-300">
                  <h2 className="py-2 pl-2 ">Bahasa Materi</h2>
                </div>

                <div className="p-2">

                  <FormField
                      control={form.control}
                      name="language"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>Materi</FormLabel>
                            <FormControl>
                              <Select
                                  onValueChange={field.onChange}
                                  defaultValue={oldData ? oldData.language : field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Indonesia"/>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="indonesia">Indonesia</SelectItem>
                                  <SelectItem value="english">English</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
                </div>

                <div className="p-2">
                  {/* field transkrip bahasa kelas */}
                  <FormField
                      control={form.control}
                      name="transkrip_video"
                      render={({field}) => (
                          <FormItem>
                            <FormLabel>Transkrip Video</FormLabel>
                            <FormControl>
                              <Select
                                  onValueChange={field.onChange}
                                  defaultValue={oldData ? oldData.language : field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Indonesia"/>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="indonesia">Indonesia</SelectItem>
                                  <SelectItem value="english">English</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                      )}
                  />
                </div>
              </div>


              {/* Kategori */}
              <div className="p-2">
                <FormField
                    control={form.control}
                    name="course_category_id" // Name of the field in your form
                    render={({field}) => (
                        <FormItem>
                          <div className="bg-gray-300">
                            <h2 className="py-2 pl-2 ">Kategori</h2>
                          </div>
                          <div className="p-2 mt-2">
                            <Input
                                placeholder="Cari Kategori"
                                value={cariKategori}
                                onChange={(e) => setCariKategori(e.target.value)}
                            />
                            <div className="mt-4 ml-4 h-20 overflow-y-scroll space-y-2">
                              {/* Loop through the data array */}
                              {categories.length > 0 ? (
                                  categories.map((category) => (
                                      <label key={category.id} className="flex gap-2 items-center">
                                        <input
                                            type="radio"
                                            name="category" // All radio buttons share the same name
                                            value={category.id}
                                            onChange={field.onChange} // Update form field on change
                                        />
                                        <p className="text-sm">{category.category_name}</p>
                                      </label>
                                  ))
                              ) : (
                                  <p>Loading categories...</p>
                              )}
                            </div>
                          </div>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
              </div>


              {/* tag */}
              <div>
                <div className="bg-gray-300">
                  <h2 className="py-2 pl-2 ">Tag</h2>
                </div>

                <div className="p-2">
                  {/* tag container */}
                  <div
                      className="flex flex-wrap min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  </div>
                </div>
              </div>


            </div>

            {/* -----------batas form----------- */}
          </form>
        </Form>
      </div>
    </>
  );
};

export default FormKelas;
