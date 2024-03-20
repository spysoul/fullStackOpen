export const CountryLanguages = ({ languages }) => {
  return (
    <>
      <p>
        <strong>Languages:{languages.eng}</strong>
      </p>
      <ul>
        {Object.keys(languages).map((key, index) => {
          return <li key={index}>{languages[key]}</li>;
        })}
      </ul>
    </>
  );
};
