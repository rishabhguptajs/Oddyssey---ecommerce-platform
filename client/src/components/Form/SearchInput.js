import React from "react"
import { NavbarItem, Input } from "@nextui-org/react"
import { useSearch } from "../../context/search"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const SearchInput = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!values.keyword) {
      setValues({ keyword: "", results: [] })
    }
    // eslint-disable-next-line
  }, [values.keyword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!values.keyword.trim()) {
      setValues({ keyword: "", results: [] })
      navigate("/search")
      return
    }
    setLoading(true)
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      )
      setValues({ ...values, results: data })
      navigate("/search")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
            placeholder={loading ? "Searching..." : "Search for products..."}
            size="sm"
            type="search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            disabled={loading}
          />
          <button
            className="mx-4 bg-red-600 px-4 py-2 rounded font_styling text-sm text-white disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "..." : "Search"}
          </button>
        </NavbarItem>
      </form>
    </div>
  )
}

export default SearchInput
