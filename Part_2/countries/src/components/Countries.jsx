export const Countries = ({ filteredCountries, handleShowClick }) => {
  return (
    <>
      {filteredCountries.map(({ cca2, name }) => {
        return (
          <div key={cca2}>
            <span>{name.common}</span>
            <button onClick={() => handleShowClick(name.common)}>Show</button>
          </div>
        );
      })}
    </>
  );
};
