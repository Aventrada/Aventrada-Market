import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/abstract-geometric-shapes.png" alt="Avatar" />
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Juan Méndez</p>
          <p className="text-sm text-muted-foreground">Bad Bunny - San Juan</p>
        </div>
        <div className="ml-auto font-medium">+$250.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/number-two-graphic.png" alt="Avatar" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Laura Rodríguez</p>
          <p className="text-sm text-muted-foreground">Daddy Yankee - Ponce</p>
        </div>
        <div className="ml-auto font-medium">+$189.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/abstract-geometric-shapes.png" alt="Avatar" />
          <AvatarFallback>CM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Carlos Morales</p>
          <p className="text-sm text-muted-foreground">Myke Towers - Mayagüez</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/abstract-geometric-shapes.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Díaz</p>
          <p className="text-sm text-muted-foreground">Bad Bunny - San Juan</p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/abstract-geometric-composition-5.png" alt="Avatar" />
          <AvatarFallback>RV</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Roberto Vega</p>
          <p className="text-sm text-muted-foreground">Myke Towers - Mayagüez</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
    </div>
  )
}
