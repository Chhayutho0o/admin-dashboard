'use client'

import React, { useEffect, useState } from 'react'
import { CourseTable } from './_components/course-table'
import { PageContainer } from '@/components/page-container'
import { courseList } from '@/app/api/courses'
import { categoriesList } from '@/app/api/categories'

const CousePage = () => {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const res = await courseList()

        setCourses(res)
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const res = await categoriesList()
        setCategories(res)
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
    fetchCategories()
  }, [])

  const filterParams = async (page, filter) => {
    const res = await courseList(page, filter)
    setCourses(res)
  }

  return (
    <PageContainer
      title='Courses'
      description='Manage course details, schedules, and enrollment capacities in real-time.'
      href='/courses/new'
    >
      <CourseTable
        data={courses.data}
        meta={courses.meta}
        loading={isLoading}
        filterParams={filterParams}
        category={categories.map(cat => ({ value: cat.id, label: cat.name }))}
      />
    </PageContainer>
  )
}

export default CousePage
