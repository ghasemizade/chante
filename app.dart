import 'dart:convert';
import 'dart:io';

// File path for storing data
const String dataFilePath = 'expense_data.json';

// Entry model
class Entry {
  int type; // 1 for income, 0 for expense
  String name;
  double amount;
  String date;

  Entry(
      {required this.type,
      required this.name,
      required this.amount,
      required this.date});

  // Convert Entry to JSON-compatible map
  Map<String, dynamic> toJson() {
    return {'type': type, 'name': name, 'amount': amount, 'date': date};
  }

  // Create an Entry object from JSON
  factory Entry.fromJson(Map<String, dynamic> json) {
    return Entry(
      type: json['type'],
      name: json['name'],
      amount: json['amount'],
      date: json['date'],
    );
  }
}

// Load data from file
Future<List<Entry>> loadFromFile() async {
  final file = File(dataFilePath);
  if (await file.exists()) {
    final contents = await file.readAsString();
    final List<dynamic> jsonData = json.decode(contents);
    return jsonData.map((e) => Entry.fromJson(e)).toList();
  }
  return [];
}

// Save data to file
Future<void> saveToFile(List<Entry> entries) async {
  final file = File(dataFilePath);
  await file
      .writeAsString(json.encode(entries.map((e) => e.toJson()).toList()));
}

// Display summary
void updateSummary(List<Entry> entries) {
  double totalIncome =
      entries.where((e) => e.type == 1).fold(0, (sum, e) => sum + e.amount);
  double totalExpense =
      entries.where((e) => e.type == 0).fold(0, (sum, e) => sum + e.amount);
  double balance = totalIncome - totalExpense;

  print('\nSummary:');
  print('Total Income: \$${totalIncome.toStringAsFixed(2)}');
  print('Total Expense: \$${totalExpense.toStringAsFixed(2)}');
  print('Balance: \$${balance.toStringAsFixed(2)}');
  calculateAnnualSavings(totalIncome);
}

// Calculate annual savings projections
void calculateAnnualSavings(double totalIncome) {
  double annualIncome = totalIncome * 12;
  print('\nAnnual Savings Projections:');
  for (var percent in [10, 20, 30]) {
    double savings = annualIncome * (percent / 100);
    print('$percent% savings: \$${savings.toStringAsFixed(2)}');
  }
}

// Add a new entry
Future<void> addItem(List<Entry> entries) async {
  stdout.write('Enter type (1 for Income, 0 for Expense): ');
  int type = int.parse(stdin.readLineSync()!);

  stdout.write('Enter name: ');
  String name = stdin.readLineSync()!;

  stdout.write('Enter amount: ');
  double amount = double.parse(stdin.readLineSync()!);

  if (amount <= 0) {
    print('Amount cannot be negative or zero!');
    return;
  }

  Entry entry = Entry(
    type: type,
    name: name,
    amount: amount,
    date: DateTime.now().toIso8601String().split('T')[0],
  );

  entries.add(entry);
  await saveToFile(entries);
  updateSummary(entries);
}

// Display all entries
void displayEntries(List<Entry> entries) {
  if (entries.isEmpty) {
    print('\nNo entries to display.');
    return;
  }
  print('\nEntries:');
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    String typeStr = entry.type == 1 ? 'Income' : 'Expense';
    print(
        '${i + 1}. ${entry.name} - \$${entry.amount.toStringAsFixed(2)} ($typeStr) on ${entry.date}');
  }
}

// Delete an entry
Future<void> deleteItem(List<Entry> entries) async {
  displayEntries(entries);
  stdout.write('\nEnter the number of the entry to delete: ');
  int index = int.parse(stdin.readLineSync()!) - 1;

  if (index >= 0 && index < entries.length) {
    var removed = entries.removeAt(index);
    print('Removed: ${removed.name}');
    await saveToFile(entries);
  } else {
    print('Invalid selection.');
  }
}

// Main program loop
Future<void> main() async {
  List<Entry> entries = await loadFromFile();

  while (true) {
    print('\nExpense Tracker Menu:');
    print('1. Add Entry');
    print('2. View Entries');
    print('3. Delete Entry');
    print('4. View Summary');
    print('5. Exit');
    stdout.write('Choose an option: ');

    String choice = stdin.readLineSync()!;

    switch (choice) {
      case '1':
        await addItem(entries);
        break;
      case '2':
        displayEntries(entries);
        break;
      case '3':
        await deleteItem(entries);
        break;
      case '4':
        updateSummary(entries);
        break;
      case '5':
        print('Goodbye!');
        return;
      default:
        print('Invalid choice. Please try again.');
    }
  }
}
