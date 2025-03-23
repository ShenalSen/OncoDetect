# Use Python 3.10 base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN python -m pip install --upgrade pip && pip install -r requirements.txt 

# Install system-level dependencies for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6

# Install numpy version 1.21.2
RUN python -m pip install "numpy<2"

# Install OpenCV
RUN python -m pip install opencv-python

# Copy the application code
COPY . .

# Install MongoDB from the official repository
RUN apt-get update && apt-get install -y gnupg curl wget && \
    wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb && \
    dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && apt-get install -y mongodb-org && \
    mkdir -p /data/db


# Expose the MongoDB and Flask ports
EXPOSE 27017 5000

# Start MongoDB and Flask
CMD ["sh", "-c", "mongod --fork --logpath /var/log/mongodb.log && python main.py"]