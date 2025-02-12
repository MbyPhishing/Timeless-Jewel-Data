# Timeless Jewel Data

A web app for Path of Exile players to discover and contribute to the database of alternate passive transformations for Timeless Jewels.

**[Live Application](https://mbyphishing.github.io/Timeless-Jewel-Data/)**

---

## 📖 About

Timeless Jewels in Path of Exile 2 alter Notable passive nodes on the skill tree depending on the jewel's seed and conqueror. I created this to help players:
- Discover alternate passive summaries for their Timeless Jewels.
- Contribute to the community by adding new data, correcting existing records and evolve the list of known notable transformations.

---

## 🚀 Getting Started

### Recommended Browser Settings

For the best experience:
- This app was built with standard resolution of **1920 x 1080** or **2560 x 1440**.
- I also silly built it with the browser zoom level to **75%**. Maybe I'll fix this one day, maybe I won't.

---

## 🧭 How to Use

### 1. Input Seed and Conqueror
1. In the top-left menu, enter your Timeless Jewel's **Seed** (a number between **100 and 8000**).
2. Select the corresponding **Conqueror**:
   - Vorana
   - Medved
   - Olroth

---

### 2. Select Jewel Socket
1. Click on a jewel socket on the passive tree.
   - If you can't reach a socket by clicking after the initial zoom, **refresh the page** and try again.
2. If no data exists for the selected jewel socket using the inputted Seed and Conqueror, in the "Alternate Passive Summary" you'll see:

    ```
    Seed yet to be discovered.
    ```

---

### 3. Contribute Notable Passive Data
1. In PoE2, place your Timeless Jewel in a jewel socket.
2. Note the **Notable Passive Transformations**.
3. In the web app, click the exact same jewel socket.
4. Ensure your **Seed** and **Conqueror** are correctly filled in the **Input Seed and Conqueror Menu** (top-left).
5. Go to the top-right menu labeled **Notables In Radius** on the web app.
6. Enter the data for each corresponding notable.
7. Click on **Submit Notables** to:
   - **Create** a new record if no data exists.
   - **Update** an existing record if the current data is incorrect.

**Tip:** After submission, **refresh the page**, select the jewel socket again, and the new or updated Alternate Passive Summary should now be displayed.

---

### 4. Correcting Incorrect Data
If you notice incorrect Alternate Passive Summary data:
1. Change the input fields with the correct information.
2. Click **Submit Notables** to update the database.

---

## 🛠️ Technologies Used
- **JavaScript** for interactivity.
- **HTML/CSS** for UI/UX.
- **GitHub Pages** for hosting.
- **Blazor** For building interactive web components.
- **Razor** For dynamic templating and UI generation.
- **Supabase** Backend as a service for data management.

---

## 📚 Contributing

Don't bother, if you have suggestions or issues, feel free to raise those.

---

## 📧 Contact

For questions or feedback, please create an issue on the repository.

---

## 📜 License

This project is licensed under the **MIT License**.

## Data Attribution  
This project uses passive tree data from *Path of Exile 2*, which is copyrighted by Grinding Gear Games (GGG). All rights to this data are owned by GGG. This project is not affiliated with or endorsed by GGG.  
