export default function DropdownMenu({
  name,
  options,
  selectedOption,
  setSelectedOption,
}) {
  return (
    <form>
      <label htmlFor={name} className='filter-menu-label'>
        by {name}:
      </label>
      <select
        className='filter-menu-select'
        name={name}
        id={name}
        onChange={(e) => setSelectedOption(e.target.value)}
        value={selectedOption}
      >
        {options.map((item) => (
          <option value={item.value} key={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </form>
  );
}
