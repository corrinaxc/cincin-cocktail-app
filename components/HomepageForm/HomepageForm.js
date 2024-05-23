import { useRouter } from 'next/router';
import styles from'./HomepageForm.module.css';

export default function HomePageForm({ handleInputChange, handleIngredientChange }) {

const router = useRouter(); 
const { query } = router;

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (data.cocktailInput) {
    const searchQuery = e.target.cocktailInput.value;
    console.log(searchQuery);
    handleInputChange(searchQuery);
    router.push({
        pathname: `${searchQuery}`,
      })
    } else if (data.ingredientInput) {
    const searchQueryIngredient = e.target.ingredientInput.value;
    console.log(searchQueryIngredient);
    handleIngredientChange(searchQueryIngredient);
    router.push({
        pathname: `${searchQueryIngredient}`,
    })
    }
}
    return (
        <form className={styles.homepageForm} onSubmit={handleSubmit}>
        {/* <HomeSearchbar /> */}
        <label htmlFor="cocktailInput" className="text-black">What is your tipple of choice?</label>
        <input type="text" name="cocktailInput" className="border-2 border-black rounded-md"></input>
        <label htmlFor="ingredientInput" className="text-black border-black">What do you have in your fridge?</label>
        <input type="text" name="ingredientInput" className="border-2 border-black rounded-md"></input>
        <button type="submit" className={styles.homepageFormButton}>I'm thirsty! Let's go</button>
        </form>
    )
}