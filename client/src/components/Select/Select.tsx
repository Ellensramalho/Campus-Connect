import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISelectsProps {
    setType: React.Dispatch<React.SetStateAction<string>>;
    setXp: React.Dispatch<React.SetStateAction<number>>;
}

export function Selects({setType, setXp}: ISelectsProps) {
  const [value, setValue] = React.useState("");
  const [xpValue, setXpValue] = React.useState("0");

  React.useEffect(() => {
    setType(value);
  }, [value]);

  React.useEffect(() => {
    if (xpValue) setXp(Number(xpValue));
  }, [xpValue]);

  return (
    <div className="flex flex-col gap-1.5">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo de desafio" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo de desafio</SelectLabel>
            <SelectItem value="desafio_xp">Desafio XP</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {value === "desafio_xp" && (
        <>
          {value === "desafio_xp" && (
            <Select value={xpValue} onValueChange={setXpValue} required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Quantidade de XP" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Quantidade de XP</SelectLabel>
                  <SelectItem value="5">5 XP</SelectItem>
                  <SelectItem value="10">10 XP</SelectItem>
                  <SelectItem value="20">20 XP</SelectItem>
                  <SelectItem value="30">30 XP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </>
      )}
    </div>
  );
}
