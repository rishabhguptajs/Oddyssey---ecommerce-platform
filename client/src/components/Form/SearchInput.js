import React from "react"
import { NavbarItem, Input } from "@nextui-org/react"
import { useSearch } from "../../context/search"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SearchInput = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      )
      setValues({ ...values, results: data })
      navigate("/search")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <NavbarItem className="flex flex-row">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search for products..."
            size="sm"
            type="search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="mx-4 bg-red-600 px-4 py-2 rounded font_styling text-sm text-white">
            Search
          </button>
        </NavbarItem>
      </form>
    </div>
  )
}

export default SearchInput
