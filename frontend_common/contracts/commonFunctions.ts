export const errorFunction=(err:any)=>{
    if (
        typeof err.data !== "undefined" &&
        typeof err.data.message !== "undefined"
      ) {
        alert(err.data.message);
      } else if (typeof err.message !== "undefined") {
        alert(err.message);
      } else {
        alert("transaction error is occuered.");
      }
}