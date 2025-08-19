

dotenv.config();
const app = express();

app.use(express.json());

// Authentication routes


app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
