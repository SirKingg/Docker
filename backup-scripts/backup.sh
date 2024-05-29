#!/bin/bash

# Script de sauvegarde MySQL

# Configuration
BACKUP_DIR=/backup
DB_HOST=mysql-server
DB_USER=root
DB_PASSWORD=nuiivozer4896gre89g9er
DATE=$(date +"%Y%m%d%H%M%S")
FILENAME="backup-$DATE.sql"

# Test de connectivité
echo "Testing connectivity to MySQL server..."
ping -c 3 $DB_HOST
if [ $? -ne 0 ]; then
    echo "Ping to $DB_HOST failed. Exiting."
    exit 1
fi

echo "Connectivity test passed."

# Commande de sauvegarde
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD --all-databases > $BACKUP_DIR/$FILENAME

if [ $? -ne 0 ]; then
    echo "mysqldump failed. Exiting."
    exit 1
fi

echo "Backup completed successfully."

# Optionnel : Supprimer les sauvegardes plus anciennes que 7 jours
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;
