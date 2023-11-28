"use server"

import getToken from "@/actions/getToken"
import { formatToSting } from "@/lib/utils"
import {
  EmployeeReport,
  ProjectExpenseReport,
  requestProjectExpenseSchema,
} from "@/lib/validations/employee"
import { redirect } from "next/navigation"
import { z } from "zod"

export const listEmployeeReportAction = async (
  employeeId: string
): Promise<EmployeeReport[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(
        `http://54.162.218.30:3000/extratofuncionario/${employeeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 401 || res.status === 400) redirect("/")

      return await res.json()
    } catch (error) {}
  })
}

export const listProjectExpenseReportAction = async (
  input: z.infer<typeof requestProjectExpenseSchema>
): Promise<any> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(
        `http://54.162.218.30:3000/lancamentobusca?id_funcionario=${
          input.userId
        }&datainicio=${formatToSting(
          input.date_start_end.from
        )}&datafim=${formatToSting(input.date_start_end.to)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 401 || res.status === 400) redirect("/")

      return await res.json()
    } catch (error) {}
  })
}
