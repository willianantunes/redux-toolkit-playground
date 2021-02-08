import filters, { setVisibilityFilter, VisibilityFilters } from "./filtersSlice"

describe("filters reducer", () => {
  it("should handle initial state", () => {
    expect(filters(undefined, {})).toEqual(VisibilityFilters.SHOW_ALL)
  })

  it("should handle visibilityFilters/setVisibilityFilter", () => {
    expect(
      filters(undefined, {
        type: setVisibilityFilter.type,
        payload: VisibilityFilters.SHOW_ACTIVE,
      })
    ).toEqual(VisibilityFilters.SHOW_ACTIVE)

    expect(
      filters(undefined, {
        type: setVisibilityFilter.type,
        payload: VisibilityFilters.SHOW_ALL,
      })
    ).toEqual(VisibilityFilters.SHOW_ALL)

    expect(
      filters(undefined, {
        type: setVisibilityFilter.type,
        payload: VisibilityFilters.SHOW_COMPLETED,
      })
    ).toEqual(VisibilityFilters.SHOW_COMPLETED)
  })
})
