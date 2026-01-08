// import { useState } from 'react';
// import { CityWeather, TemperatureUnit } from '@/types/weather';
// import { WeatherIcon } from './WeatherIcon';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface CitiesTableProps {
//   cities: CityWeather[];
//   unit: TemperatureUnit;
//   convertTemperature: (temp: number, unit: TemperatureUnit) => number;
//   onCityClick: (city: string) => void;
// }

// const ITEMS_PER_PAGE = 5;

// export const CitiesTable = ({ cities, unit, convertTemperature, onCityClick }: CitiesTableProps) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(cities.length / ITEMS_PER_PAGE);
  
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentCities = cities.slice(startIndex, endIndex);

//   const unitSymbol = unit === 'celsius' ? '°C' : '°F';

//   return (
//     <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-bold">World Cities Weather</h3>
//         <span className="text-sm text-muted-foreground">
//           {cities.length} cities
//         </span>
//       </div>

//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow className="hover:bg-transparent">
//               <TableHead className="font-semibold">City</TableHead>
//               <TableHead className="font-semibold">Condition</TableHead>
//               <TableHead className="font-semibold text-right">Temperature</TableHead>
//               <TableHead className="font-semibold text-right">Humidity</TableHead>
//               <TableHead className="font-semibold text-right">Wind</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentCities.map((city) => (
//               <TableRow
//                 key={city.id}
//                 className="cursor-pointer hover:bg-secondary/50 transition-colors"
//                 onClick={() => onCityClick(city.city)}
//               >
//                 <TableCell className="font-medium">
//                   <div className="flex flex-col">
//                     <span>{city.city}</span>
//                     <span className="text-xs text-muted-foreground">{city.country}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <WeatherIcon condition={city.condition} size={24} />
//                     <span className="capitalize text-sm">{city.condition.description}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell className="text-right font-semibold">
//                   {convertTemperature(city.temperature, unit)}{unitSymbol}
//                 </TableCell>
//                 <TableCell className="text-right">
//                   {city.humidity}%
//                 </TableCell>
//                 <TableCell className="text-right">
//                   {city.windSpeed} km/h
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
//         <p className="text-sm text-muted-foreground">
//           Showing {startIndex + 1}-{Math.min(endIndex, cities.length)} of {cities.length}
//         </p>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <div className="flex items-center gap-1">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <Button
//                 key={page}
//                 variant={page === currentPage ? 'default' : 'ghost'}
//                 size="sm"
//                 onClick={() => setCurrentPage(page)}
//                 className="w-8 h-8 p-0"
//               >
//                 {page}
//               </Button>
//             ))}
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };


import { useState } from 'react';
import { CityWeather, TemperatureUnit } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CitiesTableProps {
  cities: CityWeather[];
  unit: TemperatureUnit;
  convertTemperature: (temp: number, unit: TemperatureUnit) => number;
  onCityClick: (city: string) => void;
}

const ITEMS_PER_PAGE = 5;

export const CitiesTable = ({ cities, unit, convertTemperature, onCityClick }: CitiesTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cities.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCities = cities.slice(startIndex, endIndex);

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">World Cities Weather</h3>
        <span className="text-sm text-muted-foreground">
          {cities.length} cities
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border/100">
              <TableHead className="font-semibold">City</TableHead>
              <TableHead className="font-semibold">Condition</TableHead>
              <TableHead className="font-semibold text-right">Temperature</TableHead>
              <TableHead className="font-semibold text-right">Humidity</TableHead>
              <TableHead className="font-semibold text-right">Wind</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCities.map((city) => (
              <TableRow
                key={city.id}
                className="cursor-pointer hover:bg-secondary/50 transition-colors border-b border-border/100"
                onClick={() => onCityClick(city.city)}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{city.city}</span>
                    <span className="text-xs text-muted-foreground">{city.country}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <WeatherIcon condition={city.condition} size={24} />
                    <span className="capitalize text-sm">{city.condition.description}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {convertTemperature(city.temperature, unit)}{unitSymbol}
                </TableCell>
                <TableCell className="text-right">
                  {city.humidity}%
                </TableCell>
                <TableCell className="text-right">
                  {city.windSpeed} km/h
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, cities.length)} of {cities.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};