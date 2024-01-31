import { RowAction } from '@/components/row-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'

export const DataTable = ({ data, meta, pagination }) => {
  const [filter, setFilter] = useState('')

  useEffect(() => {
    pagination(meta?.currentPage, filter)
  }, [filter])

  const handleMenuSelect = value => {}

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center py-4 bg-white p-2 my-2 rounded-md border '>
        <Input
          name='name'
          placeholder='Filter name or email...'
          className='max-w-sm'
          onChange={e => setFilter(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary'>
              <SlidersHorizontal className='w-4 h-4 mr-2' />
              Filter
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => handleMenuSelect('show')}>
              Show All User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuSelect('deleted')}>
              Show Only Deleted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuSelect('available')}>
              Show Available Uer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meta?.total > 0 ? (
              <>
                {data?.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className='font-medium'>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <RowAction />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          total of {meta?.total} results
        </div>
        <div className='space-x-2'>
          <Pagination>
            <PaginationContent>
              {meta?.pages?.map(page => (
                <PaginationItem key={page}>
                  <PaginationLink href='#'>
                    <Button
                      onClick={() => pagination(page + 1, filter)}
                      variant={meta.currentPage === page ? 'outline' : 'ghost'}
                    >
                      {page + 1}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
