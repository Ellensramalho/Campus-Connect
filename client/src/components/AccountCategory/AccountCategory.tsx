import { BecomeStudent, BecomeTeacher } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

interface IAccountCategoryProps {
  src: string;
  textButton: string;
}

export function AccountCategory({ src, textButton }: IAccountCategoryProps) {
  const [formation, setFormation] = useState<string>("");
  const [departament, setDepartament] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [registration, setRegistration] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { token, user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (textButton === "Professor") {
        if (!formation || !departament) {
          toast.info("Por favor, preencha todos os campos.");
          return;
        }
        const data = await BecomeTeacher(token, formation, departament);
        console.log(data);
        toast.success(data.message);
        setDepartament("");
        setFormation("");
      }

      else if (textButton === "Estudante"){
        if (!course) {
          toast.info("Por favor, preencha todos os campos.");
          return;
        }
        const data = await BecomeStudent(token, course, registration);
        console.log(data);
        toast.success(data.message);
        setCourse("");
        setRegistration("");
      }
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="my-5 p-4
                    flex flex-col items-center justify-center
                    cursor-pointer
                    bg-white
                    border-2 border-transparent 
                    rounded-lg
                    shadow-lg
                    hover:border-blue-500 hover:shadow-xl hover:scale-[1.02]
                    transition-all duration-300
                    w-full max-w-xs sm:w-60
                    h-full"
        >
          <Image
            src={src}
            alt="imagem para selecionar estudante"
            width={200}
            height={200}
          />
          <span>{textButton}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Solicitar categoria de conta</DialogTitle>
            <DialogDescription>
              A partir daqui você pode nos dizer mais sobre sua função na
              instituição de ensino, como professor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {textButton === "Professor" && (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="formation">Formação*</Label>
                  <Input
                    id="formation"
                    placeholder="Área de formação"
                    value={formation}
                    onChange={(e) => setFormation(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="departament">Departamento*</Label>
                  <Input
                    id="departament"
                    placeholder="Ex: Departamento de Matemática, Computação, Letras..."
                    onChange={(e) => setDepartament(e.target.value)}
                  />
                </div>
              </>
            )}

            {textButton === "Estudante" && (
              <>
              <div className="grid gap-3">
                  <Label htmlFor="matricula">Matrícula</Label>
                  <Input 
                    id="matricula" 
                    placeholder="Sua matrícula de instituição..." 
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="course">Curso</Label>
                  <Input 
                    id="course" 
                    placeholder="Curso que frequenta..." 
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter className="py-3">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              {loading ? (
                <span className="flex flex-row items-center gap-1.5">
                  <Spinner />
                  Aguarde
                </span>
              ) : (
                <span>Solicitar</span>
              )}
            </Button>
          </DialogFooter>{" "}
        </form>
      </DialogContent>
    </Dialog>
  );
}
