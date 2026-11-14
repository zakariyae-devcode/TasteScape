export const logger = (req, res, next) => {
  const { method, url } = req;
  const startTime =Date.now();

  res.on("done",()=>{
    const endTime=Date.now();
    const duration=endTime - startTime;
    const timestamp=new Date().toISOString();

    const statusCode=res.statusCode;
   
    console.log(`[${timestamp}] ${method} ${url} ${statusCode} - ${duration}ms`);
  });

 
  next();
}