const Search = ({ search, setSearch }) => {
    return (
        <div className="search">
            <h2>Pesquisar: </h2>
            <input type="text"
                value={search} //pega o valor da pesquisa
                onChange={(e) => (setSearch(e.target.value))} // alterar o valor da pesquisa e manda pro setSearch
                placeholder="Digite para pesquisar..."

            />
        </div>


    )
};


export default Search;