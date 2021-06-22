  export const sortObject = (obj) => {
    return (selected) => {
      const { [selected]: _, ...rest } = obj;
      return { [selected]: { ...obj[selected] }, ...rest };
    };
  };


