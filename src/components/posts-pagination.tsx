import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

import { range } from 'lodash'

const calcPagesRange = (page: number, lastPage: number, visibleCount: number) => {
  if (lastPage === 1) {
    return []
  }
  const start = page > 3 ? page - 2 : 2
  const end = start + visibleCount < lastPage ? start + visibleCount : lastPage

  return range(start, end)
}

export default function PostsPagination({
  page = 1,
  total = 0,
  type = 'feed',
  limit,
}: {
  page: number
  total: number
  type: 'feed' | 'user'
  limit: number
}) {
  const lastPage = Math.ceil(total / limit) || 1
  const pagesRange = calcPagesRange(page, lastPage, 5)

  const redirectPath = type === 'feed' ? '/feed/' : '/posts/my/'

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            isActive={page === 1}
            href={redirectPath + 1}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {Boolean(pagesRange.length) && <PaginationEllipsis />}

        {pagesRange.map(el => (
          <PaginationItem key={el}>
            <PaginationLink
              isActive={el === page}
              href={redirectPath + el}
            >
              {el}
            </PaginationLink>
          </PaginationItem>
        ))}

        {Boolean(pagesRange.length) && <PaginationEllipsis />}

        {lastPage !== 1 && (
          <PaginationItem>
            <PaginationLink
              isActive={page === lastPage}
              href={redirectPath + lastPage}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
