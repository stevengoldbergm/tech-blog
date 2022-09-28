const eventTest = (event) => {
    event.preventDefault();

    console.log('\n\n\nThe code to add a comment goes here\n\n\n')
}
document.querySelector('.form').addEventListener('submit', eventTest);
