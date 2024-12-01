import json
from datetime import date

# Data storage file
DATA_FILE = 'expense_data.json'

# Load data from file
def load_from_file():
    try:
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Save data to file
def save_to_file(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

# Calculate and display summary
def update_summary(entries):
    total_income = sum(entry['amount'] for entry in entries if entry['type'] == 1)
    total_expense = sum(entry['amount'] for entry in entries if entry['type'] == 0)
    balance = total_income - total_expense

    print(f"\nSummary:\nTotal Income: {total_income}\nTotal Expense: {total_expense}\nBalance: {balance}")
    calculate_annual_savings(total_income)

# Calculate annual savings based on different percentages
def calculate_annual_savings(total_income):
    annual_income = total_income * 12
    print("\nAnnual Savings Projections:")
    for percent in [10, 20, 30]:
        savings = annual_income * (percent / 100)
        print(f"{percent}% savings: {savings:,.2f}")

# Add a new entry
def add_item(entries):
    type_str = input("Enter type (1 for Income, 0 for Expense): ")
    name = input("Enter name: ")
    amount = float(input("Enter amount: "))

    if amount <= 0:
        print("Amount cannot be negative or zero!")
        return
    
    entry = {
        'type': int(type_str),
        'name': name,
        'amount': amount,
        'date': date.today().isoformat()
    }
    entries.append(entry)
    save_to_file(entries)
    update_summary(entries)

# Display all entries
def display_entries(entries):
    if not entries:
        print("\nNo entries to display.")
        return
    print("\nEntries:")
    for i, entry in enumerate(entries, start=1):
        type_str = 'Income' if entry['type'] == 1 else 'Expense'
        print(f"{i}. {entry['name']} - {entry['amount']} ({type_str}) on {entry['date']}")

# Delete an entry
def delete_item(entries):
    display_entries(entries)
    index = int(input("\nEnter the number of the entry to delete: ")) - 1
    if 0 <= index < len(entries):
        removed = entries.pop(index)
        print(f"Removed: {removed['name']}")
        save_to_file(entries)
    else:
        print("Invalid selection.")

# Main program loop
def main():
    entries = load_from_file()
    while True:
        print("\nExpense Tracker Menu:")
        print("1. Add Entry\n2. View Entries\n3. Delete Entry\n4. View Summary\n5. Exit")
        choice = input("Choose an option: ")

        if choice == '1':
            add_item(entries)
        elif choice == '2':
            display_entries(entries)
        elif choice == '3':
            delete_item(entries)
        elif choice == '4':
            update_summary(entries)
        elif choice == '5':
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
