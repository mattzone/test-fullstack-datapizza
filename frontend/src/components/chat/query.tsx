const Query = ({ query }: { query: string }) => {
  console.log(query);

  return (
    <div className="flex justify-end">
      <div className="bg-teal-900 rounded-3xl px-5 py-4 break-words whitespace-pre-wrap sm:max-w-2/3 max-w-3/4 md:text-lg/7 text-xs/5">
        {query}
      </div>
    </div>
  );
};

export default Query;
