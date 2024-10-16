import React from 'react';
import { Api } from '../models/Api';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface ApiListProps {
  apis: Api[];
  onEdit: (api: Api) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function ApiList({ 
  apis, 
  onEdit, 
  onDelete, 
  searchTerm, 
  setSearchTerm, 
  currentPage, 
  totalPages, 
  setCurrentPage 
}: ApiListProps) {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search APIs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-sm"
      />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Endpoint</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apis.map((api) => (
            <TableRow key={api._id}>
              <TableCell>{api.name}</TableCell>
              <TableCell>{api.endpoint}</TableCell>
              <TableCell>{api.method}</TableCell>
              <TableCell>{api.description}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => onEdit(api)}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete(api._id || '')}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center">
        <Button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button 
          onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}