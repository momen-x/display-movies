import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function CardPage({src,MovieName,overview,evaluation,children,ClassiFication/*,originCountry*//*,type*/}) {
  return (
    <div>
<Card sx={{ maxWidth: 345 }}>
      <CardMedia
  className='cardMedia'
  component="img"
  sx={{ height: 140 }}
  image={src}
  alt="Default photo"
/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{display:'flex',justifyContent:'center',width:'80%',margin:'10px auto'}}>
         {MovieName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {overview} 
        </Typography>
        <Typography variant='body1' component={'div'} sx={{margin:'10px 0'}}>
evaluation : {evaluation}
<div style={{width:'100%',textAlign:'center'}}>

 <br/>{children}
</div>
        </Typography>
        {/* <Typography component={'h4'}>
          Type : {type}
        </Typography> */}
<Typography component={'h4'} >
  ClassiFication : {ClassiFication}
</Typography>
{/* <Typography component={'h6'}>
  origin country : {originCountry}
</Typography> */}
      </CardContent>
   
    </Card>
    </div>
  )
}
